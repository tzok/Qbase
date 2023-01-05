using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace RNAqbase.Models.Search
{
    public class SequenceOfTetradsFilter : Filter
    {
        public SequenceOfTetradsFilter()
        {
            FieldInSQL = "STRING_AGG(COALESCE((n1.short_name)||(n2.short_name)||(n3.short_name)||(n4.short_name), ''), '')";
            joinType = JoinType.Having;
        }
        public override List<Condition> Conditions { get; set; } = new List<Condition>();

        public override string JoinConditions()
        {
            if (Conditions.Count == 0)
            {
                return "";
            }
            var codes = new Dictionary<string, string>(){
                {"A", "A"},
                {"C", "C"},
                {"G", "G"},
                {"T", "T"},
                {"U", "U"},
                {"R", "[AG]"},
                {"Y", "[CTU]"},
                {"K", "[GTU]"},
                {"M", "[AC]"},
                {"S", "[CG]"},
                {"W", "[ATU]"},
                {"B", "[CGTU]"},
                {"D", "[AGTU]"},
                {"H", "[ACTU]"},
                {"V", "[ACG]"},
                {"N", "[ACGTU]"},
                {"-", "-"}
            };
            StringBuilder querySB = new StringBuilder("");
            for (int i = 0; i < Conditions.Count; i++)
            {
                if (Conditions[i].Value.Length == 2)
                {
                    Conditions[i].Value += "NN";
                }
                else if (Conditions[i].Value.Length == 3){
                    Conditions[i].Value += "N";
                }
                string[] permutations = GetPermutations(Conditions[i].Value).ToArray();
                IEnumerable<string> distinctPermutations = permutations.Distinct();
                foreach (string permutation in distinctPermutations)
                {
                    querySB.Append($"{permutation}|");
                }
            }
            
            foreach (string key in codes.Keys)
            {
                querySB.Replace(key, codes[key]);
            }
            querySB.Length--;
            querySB.Insert(0, $"'({FieldInSQL} ~* '");
            return querySB + "')";
        }
        public static IEnumerable<string> GetPermutations(string input)
        {
            if (input.Length == 1)
            {
                yield return input;
            }
            else
            {
                for (int i = 0; i < input.Length; i++)
                {
                    char c = input[i];
                    string remaining = input.Substring(0, i) + input.Substring(i + 1);
                    foreach (string permutation in GetPermutations(remaining))
                    {
                        yield return c + permutation;
                    }
                }
            }
        }
    }
}
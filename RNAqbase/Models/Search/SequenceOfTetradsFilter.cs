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
                {"A", "[Aa]"},
                {"C", "[Cc]"},
                {"G", "[Gg]"},
                {"T", "[Tt]"},
                {"U", "[Uu]"},
                {"R", "[AGag]"},
                {"Y", "[CTUctu]"},
                {"K", "[GTUgtu]"},
                {"M", "[ACac]"},
                {"S", "[CGcg]"},
                {"W", "[ATUatu]"},
                {"B", "[CGTUcgtu]"},
                {"D", "[AGTUagtu]"},
                {"H", "[ACTUactu]"},
                {"V", "[ACGacg]"},
                {"N", "[ACGTUacgtu]"},
                {"-", "-"}
            };
            StringBuilder querySB = new StringBuilder("");
            for (int i = 0; i < Conditions.Count; i++)
            {
                var condition = Conditions[i].Value.ToUpper();
                if (condition.Length == 1)
                {
                    condition += "NNN";
                }
                else if (condition.Length == 2)
                {
                    condition += "NN";
                }
                else if (condition.Length == 3){
                    condition += "N";
                }
                string[] permutations = GetPermutations(condition).ToArray();
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
            string query = $"({FieldInSQL} ~* @{ParameterDictionary.Count})";
            ParameterDictionary.Add($"{ParameterDictionary.Count}", $"{querySB}");
            return query;
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
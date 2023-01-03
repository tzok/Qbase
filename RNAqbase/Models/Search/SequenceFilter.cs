using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RNAqbase.Models.Search
{
    public class SequenceFilter : Filter
    {
        public SequenceFilter()
        {
            FieldInSQL = "";
            joinType = JoinType.Having;
        }
        public override List<Condition> Conditions { get; set; } = new List<Condition>();

        public override string JoinConditions()
        {
            if (Conditions.Count == 0)
            {
                return "";
            }
            //StringBuilder querySB = new StringBuilder($"({FieldInSQL} ");
            for (int i = 0; i < Conditions.Count; i++) {

                if (Conditions[i].Operator == "includes")
                {
                    joinType = JoinType.Where;
                    FieldInSQL = "tu dać tetrady w quadruplexie";
                    string[] permutations = GetPermutations("CGTA").ToArray();
                    IEnumerable<string> distinctPermutations = permutations.Distinct();
                    StringBuilder querySB = new StringBuilder($"({FieldInSQL} && array[");
                    foreach (string permutation in distinctPermutations)
                    {
                        querySB.Append($"'{permutation}', ");
                    }
                    querySB.Length--;
                    querySB.Length--;
                    return querySB.ToString() + "])";
                }
                else if (Conditions[i].Operator == "5'->3'")
                {
                    joinType = JoinType.Where;
                    FieldInSQL = "tu dać sekwencję quadruplexu";
                    StringBuilder querySB = new StringBuilder($"({FieldInSQL} ~ '^[^-]+$')");
                    return querySB.ToString();
                }
                else if (Conditions[i].Operator == "IUPAC")
                {
                    joinType = JoinType.Where;
                    FieldInSQL = "tu dać sekwencję quadruplexu";
                    var codes = new Dictionary<string, string>(){
                    {"A", "A"},
                    {"C", "C"},
                    {"G", "G"},
                    {"T", "T"},
                    {"U", "U"},
                    {"R", "AG"},
                    {"Y", "CTU"},
                    {"K", "GTU"},
                    {"M", "AC"},
                    {"S", "CG"},
                    {"W", "ATU"},
                    {"B", "CGTU"},
                    {"D", "AGTU"},
                    {"H", "ACTU"},
                    {"V", "ACG"},
                    {"N", "ACGTU"},
                    {"-", "-"}
                };
                    StringBuilder querySB = new StringBuilder($"({FieldInSQL} ~ '");
                    foreach (var letter in Conditions[i].Value)
                    {
                        querySB.Append($"[{codes[letter.ToString()]}]");
                    }
                    return querySB.ToString() + "')";
                }
            }
            return "";
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

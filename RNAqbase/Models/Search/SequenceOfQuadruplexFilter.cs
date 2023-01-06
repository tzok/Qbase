using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace RNAqbase.Models.Search
{
    public class SequenceOfQuadruplexFilter : Filter
    {
        public SequenceOfQuadruplexFilter()
        {
            FieldInSQL = "q.dot_bracket";
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
                querySB.Append($"{codes[Conditions[i].Value.ToString()]}|");
            }

            foreach (string key in codes.Keys)
            {
                querySB.Replace(key, codes[key]);
            }
            querySB.Length--;
            querySB.Insert(0, $"((SELECT * FROM remove_dots({FieldInSQL})) ~* '");
            return querySB + "')";
        }
    }
}

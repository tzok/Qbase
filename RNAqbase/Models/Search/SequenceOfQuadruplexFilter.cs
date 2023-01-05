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
            //StringBuilder querySB = new StringBuilder($"({FieldInSQL} ");
            for (int i = 0; i < Conditions.Count; i++)
            {
                StringBuilder querySB = new StringBuilder($"({FieldInSQL} ~ '");
                foreach (var letter in Conditions[i].Value)
                {
                    querySB.Append($"[{codes[letter.ToString()]}]");
                }
                return querySB.ToString() + "')";

            }
            return "";
        }
    }
}

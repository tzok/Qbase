using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RNAqbase.Models.Search
{
    public class PDBDepositionFilter : Filter
    {
        public PDBDepositionFilter()
        {
            FieldInSQL = "MAX(p.release_date)::date";
            joinType = JoinType.Having;
        }
        public override List<Condition> Conditions { get; set; } = new List<Condition>();

        public override string JoinConditions()
        {
            if (Conditions.Count != 1)
            {
                return "";
            }

            StringBuilder querySB = new StringBuilder($"({FieldInSQL} ");
            if (Conditions[0].Operator == "{}")
            {
                if (Conditions[0].Value.Split(",").Count() != 2) 
                {
                    return "";
                }

                querySB.Append($"BETWEEN '{Conditions[0].Value.Split(",")[0]}'::date AND '{Conditions[0].Value.Split(",")[1]}'::date");
            }
            else 
            {
                querySB.Append($"{Conditions[0].Operator} '{Conditions[0].Value}'::date");
            }

            return querySB.ToString() + ")";
        }
    }
}

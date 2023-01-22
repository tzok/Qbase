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

        public override string Join()
        {
            StringBuilder querySB = new StringBuilder($"(");
            for (int i = 0; i < Conditions.Count; i++)
            {
                querySB.Append($"({FieldInSQL} {Conditions[i].Operator} '{Conditions[i].Value}'::date)");

                if (i != Conditions.Count - 1)
                {
                    querySB.Append(" AND ");
                }
            }

            return querySB.ToString() + ")";
        }
    }
}

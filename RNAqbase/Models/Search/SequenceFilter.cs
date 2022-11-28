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
            StringBuilder querySB = new StringBuilder($"({FieldInSQL} ");
            if (Conditions.Where(x => x.Value == "includes").ToList().Any())
            {

            }
            else if (Conditions.Where(x => x.Value == "3'->5'").ToList().Any())
            {

            }

            return null;
        }
    }
}

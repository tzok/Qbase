using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RNAqbase.Models.Search
{
    public class BulgesFilter : Filter
    {
        public BulgesFilter()
        {
            isAnyValue = true;
        }
        public override List<Condition> Conditions { get; set; } = new List<Condition>();

        public override string Join()
        {
            StringBuilder querySB = new StringBuilder(@"(SELECT COUNT(count) FROM (
SELECT COUNT(*) as count
FROM quadruplex q2
JOIN loop l on q2.id = l.quadruplex_id
JOIN loop_nucleotide ln on l.id = ln.loop_id
JOIN nucleotide n on ln.nucleotide_id = n.id
WHERE q2.id = q.id
GROUP BY l.id) bulges_select) ");
            if (Conditions[0].Value == "with bulges")
            {
                querySB.Append("!= ");
            }
            else
            {
                querySB.Append("= ");
            }
            querySB.Append(@"count_bulges(q.dot_bracket)");
            return querySB.ToString();
        }
    }
}

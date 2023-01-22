using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RNAqbase.Models.Search
{
    public class LoopLengthFilter : Filter
    {
        public LoopLengthFilter() 
        {
        
        }

        public override List<Condition> Conditions { get; set; } = new List<Condition>();
        
        public override string Join()
        {
            StringBuilder querySB = new StringBuilder(@"(SELECT CASE WHEN EXISTS (SELECT 
COUNT(*)
FROM quadruplex q2
JOIN loop l on q2.id = l.quadruplex_id
JOIN loop_nucleotide ln on l.id = ln.loop_id
JOIN nucleotide n on ln.nucleotide_id = n.id
WHERE q2.id = q.id
GROUP BY l.id");

            if (Conditions.Count == 1)
            {
                querySB.Append($" HAVING LENGTH(STRING_AGG(COALESCE(n.short_name, ''), ''))::int {Conditions[0].Operator} {Conditions[0].Value})");
            }
            else if (Conditions.Count == 2) 
            {
                querySB.Append($@" HAVING LENGTH(STRING_AGG(COALESCE(n.short_name, ''), ''))::int {Conditions[0].Operator} {Conditions[0].Value} AND 
LENGTH(STRING_AGG(COALESCE(n.short_name, ''), ''))::int {Conditions[1].Operator} {Conditions[1].Value})");
            }
            else
            {
                return "";
            }
            querySB.Append(@" THEN CAST (1 AS BOOL)
ELSE CAST (0 AS BOOL) END)");
            return querySB.ToString();
        }
    }
}

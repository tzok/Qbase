using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RNAqbase.Models.Search
{
    public class V_LoopsFilter : Filter
    {
        public override List<Condition> Conditions { get; set; } = new List<Condition>();

        public override string JoinConditions()
        {
            if (Conditions.Count != 1 || Conditions.Where(x => x.Value == "any").ToList().Any())
            {
                return "";
            }

            StringBuilder querySB = new StringBuilder(@"(SELECT COUNT(*) 
FROM REGEXP_MATCHES((REGEXP_SPLIT_TO_ARRAY(q.dot_bracket, 
'[.]*\\n[.]*'))[2],
'([[\(\)\[\]\{\}\<\>A-Za-z]+)', 'g')) ");
            if (Conditions.Where(x => x.Value == "with V-Loops").ToList().Any())
            {
                querySB.Append("!= ");
            }
            else
            {
                querySB.Append("= ");
            }

            querySB.Append(@"(SELECT(4 + (SELECT
((SELECT COUNT(*) FROM REGEXP_MATCHES((REGEXP_SPLIT_TO_ARRAY(q.dot_bracket,
'[.]*\\n[.]*'))[2],
'(?<![.-])([.]+)(?![.-])', 'g')) 
- 
(SELECT COUNT(*)
FROM quadruplex q2
JOIN loop l on q2.id = l.quadruplex_id
JOIN loop_nucleotide ln on l.id = ln.loop_id
JOIN nucleotide n on ln.nucleotide_id = n.id
WHERE q2.id = q.id
GROUP BY l.id)))))");
            return querySB.ToString();
        }
    }
}

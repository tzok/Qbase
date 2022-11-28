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
            joinType = JoinType.Having;
        }
        public override List<Condition> Conditions { get; set; } = new List<Condition>();

        public override string JoinConditions()
        {
            if (Conditions.Count == 0 || Conditions.Where(x => x.Value != "with bulges" && x.Value != "without bulges").ToList().Any())
            {
                return "";
            }

            StringBuilder querySB = new StringBuilder();
            if (Conditions[0].Value == "with bulges")
            {
                querySB.Append("(is_bulge(q.dot_bracket, STRING_AGG(COALESCE((n1.full_name)||(n2.full_name)||(n3.full_name)||(n4.full_name), ''), '')))");
            }
            else
            {
                querySB.Append("(NOT is_bulge(q.dot_bracket, STRING_AGG(COALESCE((n1.full_name)||(n2.full_name)||(n3.full_name)||(n4.full_name), ''), '')))");
            }

            return querySB.ToString();
        }
    }
}

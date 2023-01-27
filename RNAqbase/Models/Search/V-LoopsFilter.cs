using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RNAqbase.Models.Search
{
    public class V_LoopsFilter : Filter
    {
        public V_LoopsFilter() 
        {
            isAnyValue = true;
        }
        public override List<Condition> Conditions { get; set; } = new List<Condition>();

        public override string Join()
        {
            StringBuilder querySB = new StringBuilder();
            if (Conditions.Where(x => x.Value == "without V-Loops").ToList().Any())
            {
                querySB.Append("NOT");
            }

            querySB.Append("(is_v_loops(q.dot_bracket, q.id))");
            return querySB.ToString();
        }
    }
}

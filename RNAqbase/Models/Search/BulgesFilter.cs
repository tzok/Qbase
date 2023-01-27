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
            StringBuilder querySB = new StringBuilder();
            if (Conditions[0].Value == "without bulges")
            {
                querySB.Append("NOT");
            }
            querySB.Append(@"(is_bulges(q.dot_bracket, q.id))");
            return querySB.ToString();
        }
    }
}

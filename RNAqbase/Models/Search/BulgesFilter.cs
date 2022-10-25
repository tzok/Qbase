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
            FieldInSQL = "q.dot_bracket";
        }
        public override List<Condition> Conditions { get; set; } = new List<Condition>();

        public override string JoinConditions()
        {
            if (Conditions.Count == 0 || Conditions.Where(x => x.Value != "with bulges" && x.Value != "without bulges").ToList().Any())
            {
                return "";
            }

            StringBuilder querySB = new StringBuilder($"({FieldInSQL} ");
            if (Conditions[0].Value == "with bulges")
            {
                querySB.Append("~ '([^.][.]{1})+$|^([.]{1}[^.])+|[^.]([.]{1}[^.])+");
            }
            else
            {
                querySB.Append("!~ '([^.][.]{1})+$|^([.]{1}[^.])+|[^.]([.]{1}[^.])+");
            }

            return querySB.ToString() + "')";
        }
    }
}

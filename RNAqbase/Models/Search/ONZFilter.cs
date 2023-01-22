using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RNAqbase.Models.Search
{
    public class ONZFilter : Filter
    {
        public ONZFilter()
        {
            FieldInSQL = "t.onz";
            isAnyValue = true;
        }
        public override List<Condition> Conditions { get; set; } = new List<Condition>();

        public override string Join()
        {
            StringBuilder querySB = new StringBuilder($"({FieldInSQL} IN ('{Conditions[0].Value}'");
            for (int i = 1; i < Conditions.Count; i++)
            {
                querySB.Append($", '{Conditions[i].Value}'");
            }
            return querySB.ToString() + "))";
        }
    }
}

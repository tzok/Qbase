using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace RNAqbase.Models.Search
{
    public class IonsFilter : Filter
    {
        public IonsFilter()
        {
            FieldInSQL = "array_agg(DISTINCT(ion.name)::text)";
            joinType = JoinType.Having;
            isAnyValue = true;
        }
        public override List<Condition> Conditions { get; set; } = new List<Condition>();

        public override string Join()
        {
            StringBuilder querySB = new StringBuilder($"({FieldInSQL} && array['{Conditions[0].Value}'");
            for (int i = 1; i < Conditions.Count; i++)
            {
                querySB.Append($", '{Conditions[i].Value}'");
            }
            return querySB.ToString() + "])";
        }
    }
}

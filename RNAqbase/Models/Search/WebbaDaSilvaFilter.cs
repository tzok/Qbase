using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RNAqbase.Models.Search
{
    public class WebbaDaSilvaFilter : Filter
    {
        public WebbaDaSilvaFilter()
        {
            FieldInSQL = "loop_progression";
        }

        public override List<Condition> Conditions { get; set; } = new List<Condition>();

        public override string Join()
        {
            string query = "(";
            for (int i = 0; i < Conditions.Count; i++)
            {
                query += $"({FieldInSQL} LIKE '{Conditions[i].Value}')";
                if (i != Conditions.Count - 1)
                {
                    query += " OR ";
                }
            }

            return query + ")";
        }
    }
}

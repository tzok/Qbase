using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RNAqbase.Models.Search
{
    public class WebbaDaSilva : Filter
    {
        public WebbaDaSilva()
        {
            FieldInSQL = "loop_progression";
        }

        public override List<Condition> Conditions { get; set; } = new List<Condition>();

        public override string JoinConditions()
        {
            if (Conditions.Count == 0 || Conditions.Where(x => x.Value == "any").ToList().Any())
            {
                return "";
            }
            string query = "(";
            for (int i = 0; i < Conditions.Count; i++)
            {
                query += $"({FieldInSQL} LIKE '{Conditions[i].Value}%')";
                if (i != Conditions.Count - 1)
                {
                    query += " OR ";
                }
            }

            return query + ")";
        }
    }
}

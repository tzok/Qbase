using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RNAqbase.Models.Search
{
    public class TypeFilter : Filter
    {
        public new readonly string FieldInSQL = "?";
        public override List<Condition> Conditions { get; set; } = new List<Condition>();

        public TypeFilter()
        {

        }

        public override string JoinConditions()
        {
            if (Conditions.Count == 0 || Conditions.Where(x => x.Value == "any").ToList().Any())  //TODO wydzielić do klasy abstrakcyjnej? wtedy join by miało walidację i właściwy join
            {
                return "";
            }

            string query = $"({FieldInSQL} IN ('{Conditions[0].Value}'";
            for (int i = 1; i < Conditions.Count; i++)
            {
                query += $", '{Conditions[i].Value}'";
            }

            return query + "))";
        }
    }
}

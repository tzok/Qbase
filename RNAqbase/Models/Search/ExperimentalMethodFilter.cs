using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RNAqbase.Models.Search
{
    public class ExperimentalMethodFilter : Filter
    {
        public override List<Condition> Conditions { get; set; } = new List<Condition>();

        public new readonly string FieldInSQL = "experiment";
        // Query to get all elements: SELECT DISTINCT experiment FROM PDB;
        public override string JoinConditions()
        {
            if (Conditions.Count == 0 || Conditions.Where(x => x.Value == "any").ToList().Any())
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

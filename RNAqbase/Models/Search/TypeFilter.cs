using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RNAqbase.Models.Search
{
    public class TypeFilter : Filter
    {
        public new readonly string FieldInSQL = "max(q_view.chains)";
        public override List<Condition> Conditions { get; set; } = new List<Condition>();

        public TypeFilter()
        {

        }

        public override string JoinConditions()
        {
            if (Conditions.Count == 0 || Conditions.Where(x => x.Value == "any").ToList().Any()) 
            {
                return "";
            }

            foreach (var i in Conditions)
            {
                if (i.Value == "unimolecular")
                    i.Value = "1";
                else if (i.Value == "bimolecular")
                    i.Value = "2";
                else
                    i.Value = "4";
            }

            string query = $"({FieldInSQL} IN ({Conditions[0].Value}";
            for (int i = 1; i < Conditions.Count; i++)
            {

                query += $", {Conditions[i].Value}";
            }

            return query + "))";
        }
    }
}

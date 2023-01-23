using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RNAqbase.Models.Search
{
    public class TypeFilter : Filter
    {
        public TypeFilter()
        {
            FieldInSQL = "max(q_view.chains)";
            joinType = JoinType.Having;
            isAnyValue = true;
        }
        public override List<Condition> Conditions { get; set; } = new List<Condition>();

        public override string Join()
        {
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

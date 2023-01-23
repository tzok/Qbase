using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RNAqbase.Models.Search
{
    public class PDBIDFilter : Filter
    {
        public PDBIDFilter()
        {
            FieldInSQL = "p.identifier";
        }

        public override List<Condition> Conditions { get; set; } = new List<Condition>();

        public override string Join()
        {
            string query = "(";
            for (int i = 0; i < Conditions.Count; i++)
            {
                query += $"({FieldInSQL} ~* @{ParameterDictionary.Count})";
                ParameterDictionary.Add($"{ParameterDictionary.Count}", $"^{Conditions[i].Value}");

                if (i != Conditions.Count - 1)
                {
                    query += " OR ";
                }
            }

            return query + ")";
        }
    }
}
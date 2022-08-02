using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RNAqbase.Models.Search
{
    public class PDBIDFilter : IFilter
    {
        private readonly string _fieldInSQL;

        public PDBIDFilter()
        {
            _fieldInSQL = "PdbId"; // TOADD from SQL
        }

        public List<Condition> Conditions { get; set; } = new List<Condition>();

        public string FieldInSQL
        {
            get
            {
                return _fieldInSQL;
            }
        }

        public string JoinConditions()
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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RNAqbase.Models.Search
{
    public class ExperimentalMethodFilter : IFilter
    {
        private readonly string _fieldInSQL;
        
        public ExperimentalMethodFilter()
        {
            _fieldInSQL = "whatever"; // TOADD from SQL
        }
        
        public List<Condition> Conditions 
        {
            get 
            {
                return Conditions;
            }
            set 
            {
                Conditions.Add(new Condition("", "any"));
            }
        }

        public string FieldInSQL
        {
            get 
            {
                return _fieldInSQL;
            }
        }

        public string JoinConditions()
        {
            if (Conditions.Count == 0 ||
                (Conditions.Count == 1 && Conditions[0].Value == "any")) 
            {
                return "";
            } 

            string query = $"({FieldInSQL} IN ('{Conditions[0].Value}'";
            for(int i = 1; i < Conditions.Count; i++) 
            {
                query += $", '{Conditions[i].Value}'";
            }

            return query + "))";
        }
    }
}

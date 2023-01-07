using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RNAqbase.Models.Search
{
    public class AuthorFilter : Filter
    {        
        public AuthorFilter()
        {
            FieldInSQL = "name";
        }
        public override List<Condition> Conditions { get; set; } = new List<Condition>();
        public override string JoinConditions()
        {
            if (Conditions.Count == 0)
            {
                return "";
            }

            var authorLike = Conditions.Where(x => x.Operator == "=").ToList();
            var authorNotLike = Conditions.Where(x => x.Operator == "!=").ToList();
            string query = "(";

            if (authorNotLike.Any())
            {
                query += $"{FieldInSQL} NOT IN (@{ParameterDictionary.Count}";
                ParameterDictionary.Add($"{ParameterDictionary.Count}", $"{authorNotLike[0].Value}");

                for (int i = 1; i < authorNotLike.Count; i++)
                {
                    query += $", @{ParameterDictionary.Count}";
                    ParameterDictionary.Add($"{ParameterDictionary.Count}", $"{authorNotLike[i].Value}");
                }
            }

            if (authorLike.Any())
            {
                if(authorNotLike.Any())
                {
                    query += ") AND ";
                }

                query += $"{FieldInSQL} IN (@{ParameterDictionary.Count}";
                ParameterDictionary.Add($"{ParameterDictionary.Count}", $"{authorLike[0].Value}");
                for (int i = 1; i < authorLike.Count; i++)
                {
                    query += $", \"@{ParameterDictionary.Count}\"";
                    ParameterDictionary.Add($"{ParameterDictionary.Count}", $"{authorLike[i].Value}");
                }
            }

            return query + "))";
        }
    }
}

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
            FieldInSQL = "author.name";
        }
        public override List<Condition> Conditions { get; set; } = new List<Condition>();
        public override string Join()
        {
            var authorLike = Conditions.Where(x => x.Operator == "=").ToList();
            var authorNotLike = Conditions.Where(x => x.Operator == "!=").ToList();
            string query = "";

            if (authorNotLike.Any())
            {
                query += "(";

                for (int i = 0; i < authorNotLike.Count; i++)
                {
                    query += $"({FieldInSQL} NOT LIKE @{ParameterDictionary.Count},%)";
                    ParameterDictionary.Add($"{ParameterDictionary.Count}", $"{authorNotLike[i].Value}");

                    if (i != authorNotLike.Count - 1)
                    {
                        query += " AND ";
                    }
                }

                query += ")";
            }

            if (authorLike.Any())
            {
                query += "(";

                for (int i = 0; i < authorLike.Count; i++)
                {
                    query += $"({FieldInSQL} LIKE @{ParameterDictionary.Count},%)";
                    ParameterDictionary.Add($"{ParameterDictionary.Count}", $"{authorLike[i].Value}");

                    if (i != authorLike.Count - 1)
                    {
                        query += " OR ";
                    }
                }

                query += ")";
            }

            return query;
        }
    }
}

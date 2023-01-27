using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
            StringBuilder querySB = new StringBuilder();

            if (authorNotLike.Any())
            {
                querySB.Append("(");

                for (int i = 0; i < authorNotLike.Count; i++)
                {
                    querySB.Append($"({FieldInSQL} NOT LIKE @{ParameterDictionary.Count})");
                    ParameterDictionary.Add($"{ParameterDictionary.Count}", $"{authorNotLike[i].Value},%");

                    if (i != authorNotLike.Count - 1)
                    {
                        querySB.Append(" AND ");
                    }
                }
                querySB.Append(")");
            }

            if (authorLike.Any())
            {
                if (authorNotLike.Any()) 
                {
                    querySB.Append(" AND ");
                }
                querySB.Append("(");

                for (int i = 0; i < authorLike.Count; i++)
                {
                    querySB.Append($"({FieldInSQL} LIKE @{ParameterDictionary.Count})");
                    ParameterDictionary.Add($"{ParameterDictionary.Count}", $"{authorLike[i].Value},%");

                    if (i != authorLike.Count - 1)
                    {
                        querySB.Append(" OR ");
                    }
                }
                querySB.Append(")");
            }

            return querySB.ToString();
        }
    }
}

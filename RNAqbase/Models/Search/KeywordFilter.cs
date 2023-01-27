using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RNAqbase.Models.Search
{
    public class KeywordFilter : Filter
    {
        public KeywordFilter()
        {
        }
        public override List<Condition> Conditions { get; set; } = new List<Condition>();
        public override string Join()
        {
            string querySB = $"(citation.title ILIKE @{ParameterDictionary.Count} OR citation.abstract ILIKE @{ParameterDictionary.Count} OR p.title ILIKE @{ParameterDictionary.Count})";
            ParameterDictionary.Add($"{ParameterDictionary.Count}", $"%{Conditions[0].Value}%");
            return querySB;
        }
    }
}

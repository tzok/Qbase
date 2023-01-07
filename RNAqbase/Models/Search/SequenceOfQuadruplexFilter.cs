using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace RNAqbase.Models.Search
{
    public class SequenceOfQuadruplexFilter : Filter
    {
        public SequenceOfQuadruplexFilter()
        {
            FieldInSQL = "q.dot_bracket";
        }
        public override List<Condition> Conditions { get; set; } = new List<Condition>();

        public override string JoinConditions()
        {
            if (Conditions.Count == 0)
            {
                return "";
            }
            var codes = new Dictionary<string, string>(){
                {"A", "[Aa]"},
                {"C", "[Cc]"},
                {"G", "[Gg]"},
                {"T", "[Tt]"},
                {"U", "[Uu]"},
                {"R", "[AGag]"},
                {"Y", "[CTUctu]"},
                {"K", "[GTUgtu]"},
                {"M", "[ACac]"},
                {"S", "[CGcg]"},
                {"W", "[ATUatu]"},
                {"B", "[CGTUcgtu]"},
                {"D", "[AGTUagtu]"},
                {"H", "[ACTUactu]"},
                {"V", "[ACGacg]"},
                {"N", "[ACGTUacgtu]"},
                {"-", "-"}
            };
            StringBuilder querySB = new StringBuilder("");
            for (int i = 0; i < Conditions.Count; i++)
            {
                var condition = Conditions[i].Value.ToUpper();
                querySB.Append($"{condition}|");
            }

            foreach (string key in codes.Keys)
            {
                querySB.Replace(key, codes[key]);
            }
            querySB.Length--;
            string query = $"((SELECT * FROM remove_dots({FieldInSQL})) ~* @{ParameterDictionary.Count})";
            ParameterDictionary.Add($"{ParameterDictionary.Count}", $"{querySB}");
            return query;

        }
    }
}

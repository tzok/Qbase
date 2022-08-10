using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RNAqbase.Models.Search
{
    public class V_LoppsFilter : Filter
    {
        public override List<Condition> Conditions { get; set; } = new List<Condition>();

        public override string JoinConditions()
        {
            if (Conditions.Count != 1 || Conditions.Where(x => x.Value == "any").ToList().Any())
            {
                return "";
            }

            if (Conditions.Where(x => x.Value == "V-loops").ToList().Any())
            {
                return "something";
            }

            if (Conditions.Where(x => x.Value == "without V-loops").ToList().Any())
            {
                return "something";
            }

            return "";
        }
    }
}

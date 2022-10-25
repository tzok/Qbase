using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RNAqbase.Models.Search
{
    public class MoleculeTypeFilter : Filter
    {
        public MoleculeTypeFilter()
        {
            FieldInSQL = "q_view.molecule";
        }
        public override List<Condition> Conditions { get; set; } = new List<Condition>();

        public override string JoinConditions()
        {
            if (Conditions.Count == 0 || Conditions.Where(x => x.Value == "any").ToList().Any())
            {
                return "";
            }
            StringBuilder querySB = new StringBuilder($"({FieldInSQL} IN ('{Conditions[0].Value}'");
            for (int i = 1; i < Conditions.Count; i++)
            {
                querySB.Append($", '{Conditions[i].Value}'");
            }
            return querySB.ToString() + "))";
        }
    }

}

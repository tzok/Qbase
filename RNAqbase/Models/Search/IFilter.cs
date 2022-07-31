using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RNAqbase.Models.Search
{
    public interface IFilter
    {
        string Attribute { get; set; }
        List<Condition> Conditions { get; set; }

        string JoinConditions();
    }
}

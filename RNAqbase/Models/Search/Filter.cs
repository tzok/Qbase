using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RNAqbase.Models.Search
{
    public abstract class Filter
    {
        public string FieldInSQL = "";
        public abstract List<Condition> Conditions { get; set; }
        public abstract string JoinConditions();
    }
}

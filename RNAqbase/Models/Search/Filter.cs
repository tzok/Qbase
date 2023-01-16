using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RNAqbase.Models.Search
{
    public abstract class Filter
    {
        public static Dictionary<string, object> ParameterDictionary = new Dictionary<string, object>();
        public static List<Filter> Filters { get; set; }
        public string FieldInSQL = "";
        public JoinType joinType = JoinType.Where;
        public abstract List<Condition> Conditions { get; set; }
        public abstract string JoinConditions();
    }

    public enum JoinType
    {
        Where,
        Having
    }
}
using System.Collections.Generic;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace RNAqbase.Models
{
    public class TetradNucleotides : BaseEntity
    {
        public string n1_full_name { get; set; }
        public string n1_short_name { get; set; }
        public float n1_chi { get; set; }
        public string n1_glycosidic_bond { get; set; }
        public string n2_full_name { get; set; }
        public string n2_short_name { get; set; }
        public float n2_chi { get; set; }
        public string n2_glycosidic_bond { get; set; }
        public string n3_full_name { get; set; }
        public string n3_short_name { get; set; }
        public float n3_chi { get; set; }
        public string n3_glycosidic_bond { get; set; }
        public string n4_full_name { get; set; }
        public string n4_short_name { get; set; }
        public float n4_chi { get; set; }
        public string n4_glycosidic_bond { get; set; }
        
    }
}
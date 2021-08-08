using System;
using System.Collections.Generic;

namespace RNAqbase.Models
{
    public class Ions_tetrad : BaseEntity
    {
        public string Ion { get; set; }
        public string Ion_charge { get; set; }
        public string symbol { get; set; }
        public string full_name { get; set; }
    }
}
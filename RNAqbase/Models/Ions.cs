using System;
using System.Collections.Generic;

namespace RNAqbase.Models
{
    public class Ions : BaseEntity
    {
        public string Ion { get; set; }
        public string Ion_charge { get; set; }
        public int Count { get; set; }
    }
}
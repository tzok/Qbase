using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RNAqbase.Models
{
    public class TetradReference : BaseEntity
    {
        public int Id { get; set; }
        public int QuadruplexId { get; set; }
        public string Sequence { get; set; }
        public string OnzClass { get; set; }
        public float Planarity { get; set; }
        public float Twist { get; set; }
        public float Rise { get; set; }



    }
}

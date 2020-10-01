using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RNAqbase.Models
{
    public class HelixReference : BaseEntity
    {
        public string Id { get; set; }
        public string PdbIdentifier { get; set; }
        public int PdbId { get; set; }
        public int AssemblyId { get; set; }
        public string PdbDeposition { get; set; }
        public string Molecule { get; set; }
        public string Sequence { get; set; }
        public int NumberOfStrands { get; set; }
        public int NumberOfTetrads { get; set; }
        public int NumberOfQudaruplexes { get; set; }
        public string Experiment { get; set; }
        public List<int> Tetrads { get; set; }
        public List<int> Quadruplexes { get; set; }
    }
}

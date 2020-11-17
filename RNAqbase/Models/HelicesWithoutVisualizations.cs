using System.Collections.Generic;

namespace RNAqbase.Models
{
    public class HelicesWithoutVisualizations
    {
        public string Id { get; set; }
        public string PdbId { get; set; }
        public string PdbDeposition { get; set; }
        public int AssemblyId { get; set; }
        public string Molecule { get; set; }
        public string Sequence { get; set; }
        public string NumberOfStrands { get; set; }
        public int NumberOfQudaruplexes { get; set; }
        public int NumberOfTetrads { get; set; }
    }
}
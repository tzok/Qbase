using Newtonsoft.Json;
using System.Collections.Generic;

namespace RNAqbase.Models
{
	public class TetradTable : BaseEntity
	{
        public int Id { get; set; }
        public int QuadruplexId { get; set; }
        public string PdbId { get; set; }
        public string PdbDeposition { get; set; }
        public int AssemblyId { get; set; }
        public string Molecule { get; set; }
        public string Sequence { get; set; }
        public string OnzClass { get; set; }
 
        [JsonIgnore]
        public int QuadruplexIdAsInt { get; set; }

        [JsonIgnore]
        public int TetradsInQuadruplex { get; set; }

	}
}
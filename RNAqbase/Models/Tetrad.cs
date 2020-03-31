using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace RNAqbase.Models
{
	public class Tetrad : BaseEntity
	{
		public int Id { get; set; }
		public string QuadruplexId => TetradsInQuadruplex > 1 ? QuadruplexIdAsInt.ToString() : "-";
		public int PdbId { get; set; }
		public string PdbIdentifier { get; set; }
		public int AssemblyId { get; set; }
		public string Molecule { get; set; }
		public string Sequence { get; set; }
		public string OnzClass { get; set; }
		public string Strands { get; set; }
		public int NumberOfStrands => Strands.Distinct().Count();
		public string PdbVisualization { get; set; }
		public string Experiment { get; set; }
		public float Planarity { get; set; }
		public List<int> TetradsInTheSameQuadruplex { get; set; }
		public List<int> TetradsInTheSamePdb { get; set; }
		public string ChiAngle { get; set; }

		[JsonIgnore]
		public int QuadruplexIdAsInt { get; set; }

		[JsonIgnore]
		public int TetradsInQuadruplex { get; set; }
	}
}

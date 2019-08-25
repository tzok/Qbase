
using System.Collections.Generic;
using System.Linq;

namespace RNAqbase.Models
{
	public class Tetrad : BaseEntity
	{
		public int Id { get; set; }
		public int QuadruplexId { get; set; }
		public string PdbId { get; set; }
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
		public float Twist { get; set; }
		public float Rise { get; set; }
		public string ChiAngle { get; set; }


	}
}

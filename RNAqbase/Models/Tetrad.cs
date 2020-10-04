using System;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace RNAqbase.Models
{
	public class Tetrad : BaseEntity
	{
		public int Id { get; set; }
		public string QuadruplexId => TetradsInQuadruplex > 1 ? QuadruplexIdAsInt.ToString() : "99999999";
		public int PdbId { get; set; }
		public string PdbIdentifier { get; set; }
		public int AssemblyId { get; set; }
		public string Molecule { get; set; }
		public string Sequence { get; set; }
		public string OnzClass { get; set; }
		public string Experiment { get; set; }
		public float Planarity { get; set; }
		public List<int> TetradsInTheSameQuadruplex { get; set; }
		public List<int> TetradsInTheSamePdb { get; set; }
		public string ArcDiagram { get; set; }
		public string Visualization2D { get; set; }
		public string PdbDeposition { get; set; }

		[JsonIgnore]
		public int QuadruplexIdAsInt { get; set; }

		[JsonIgnore]
		public int TetradsInQuadruplex { get; set; }

		
	}
}

using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using RNAqbase.Enums;

namespace RNAqbase.Models
{
	public class Quadruplex : BaseEntity
	{

		[JsonIgnore]
		public StrandDirection StrandDirection { get; set; }

		[JsonIgnore]
		public int TypeCount { get; set; }

		public string Id { get; set; }
		public string Visualization2D { get; set; }
		public byte[] Visualization3D { get; set; }
		public string OnzmClass { get; set; }
		public string PdbIdentifier { get; set; }
		public int PdbId { get; set; }
		public int AssemblyId { get; set; }
		public string Molecule { get; set; }
		public string Sequence { get; set; }
		public string NumberOfStrands { get; set; }
		public string Type => TypeCount == 1 ? "Regular" : "Irregular";
		public int NumberOfTetrads { get; set; }
		public string PdbVisualization { get; set; }
		public string Experiment { get; set; }
		public List<int> Tetrads { get; set; }
		public string ChiAngle { get; set; }
		public string ArcDiagram { get; set; }
		public string PdbDeposition { get; set; }
	}
}

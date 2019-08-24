using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using RNAqbase.Enums;

namespace RNAqbase.Models
{
	public class Quadruplex : BaseEntity
	{
		public int Id => TetradReferences.First().QuadruplexId;

		[JsonIgnore]
		public StrandDirection StrandDirection { get; set; }
		[JsonIgnore]
		public string Visualization { get; set; }
		[JsonIgnore]
		public string OnzClass => TetradReferences.First().OnzClass;
		[JsonIgnore]
		public List<Tetrad> TetradReferences { get; set; }

		public string PdbId => TetradReferences.First().PdbId;
		public int AssemblyId => TetradReferences.First().AssemblyId;
		public string Molecule => TetradReferences.First().Molecule;
		public string Sequence => TetradReferences.Select(x => x.Sequence).Aggregate((current, next) => current + next);
		public int NumberOfStrands => TetradReferences.First().NumberOfStrands;
		public string Type => TetradReferences.Select(x => x.OnzClass).Distinct().Count() == 1 ? "Regular" : "Irregular";
		public int NumberOfTetrads => TetradReferences.Count;
		public string PdbVisualization => TetradReferences.First().PdbVisualization;
		public string Experiment => TetradReferences.First().Experiment;
		public List<int> Tetrads => TetradReferences.Select(x => x.Id).ToList();
		public float Twist => TetradReferences.First().Twist;
		public float Rise => TetradReferences.First().Rise;
	}
}

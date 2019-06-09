using RNAqbase.Enums;

namespace RNAqbase.Models
{
	public class Tetrad : TetradReference
	{
		public Nucleotide Nucleotide1 { get; set; }
		public Nucleotide Nucleotide2 { get; set; }
		public Nucleotide Nucleotide3 { get; set; }
		public Nucleotide Nucleotide4 { get; set; }
		public float Planarity { get; set; }
	}
}

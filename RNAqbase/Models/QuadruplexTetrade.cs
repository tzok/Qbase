namespace RNAqbase.Models
{
	public class QuadruplexTetrade : BaseEntity
	{
		public int Id { get; set; }
		public Quadruplex Quadruplex { get; set; }
		public Tetrad Tetrad { get; set; }
	}
}

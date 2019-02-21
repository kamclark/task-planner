namespace TodoAPI.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int Priority { get; set; }
        public string Memo { get; set; }
        public bool IsComplete { get; set; }
        public string Icon { get; set; }
    }
}
import { useInView } from "react-intersection-observer";

const LazySection = ({ children, height = 400 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "800px 0px",
  });

  return (
    <div ref={ref}>
      {inView ? (
        children
      ) : (
        <div
          className="animate-pulse rounded-xl bg-gray-100"
          style={{ height }}
        />
      )}
    </div>
  );
};

export default LazySection;
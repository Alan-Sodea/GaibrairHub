import React from 'react';
import { Rocket, Users, MessageSquare, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Connectez-vous avec des mentors qui comprennent votre vision
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Rejoignez une communauté d'entrepreneurs passionnés et trouvez le mentor qui vous guidera vers le succès
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Users className="w-8 h-8 text-indigo-500" />}
          title="Trouvez votre mentor"
          description="Connectez-vous avec des entrepreneurs expérimentés qui partagent vos valeurs et votre vision"
        />
        <FeatureCard
          icon={<MessageSquare className="w-8 h-8 text-indigo-500" />}
          title="Échangez et apprenez"
          description="Bénéficiez de conseils personnalisés et d'un accompagnement sur mesure"
        />
        <FeatureCard
          icon={<TrendingUp className="w-8 h-8 text-indigo-500" />}
          title="Développez votre entreprise"
          description="Accélérez votre croissance grâce à l'expertise de mentors chevronnés"
        />
      </div>

      <div className="text-center">
        <Link
          to="/mentors"
          className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Rocket className="w-5 h-5" />
          <span>Commencer maintenant</span>
        </Link>
      </div>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);
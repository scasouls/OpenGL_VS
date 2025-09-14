#version 330 core
out vec4 FragColor;

uniform vec3 eyePos;

//材质属性
struct Material{
    sampler2D diffuse;
    sampler2D specular;
    sampler2D emission;
    float shininess;
};

//光源属性
struct Light {
    vec3 position;

    vec3 ambient;
    vec3 diffuse;
    vec3 specular;

    float constant;
    float linear;
    float quadratic;
};

uniform Light light;
uniform Material material;

in vec2 TexCoords;
in vec3 Normal;
in vec3 FragPos;  

void main()
{
    //距离衰减
    float distance    = length(light.position - FragPos);
    float attenuation = 1.0f / (light.constant + light.linear * distance + light.quadratic * (distance * distance));

    //环境光
    vec3 ambient = texture(material.diffuse, TexCoords).rgb * light.ambient;

    //漫反射
    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(light.position - FragPos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = light.diffuse * diff * texture(material.diffuse, TexCoords).rgb;
    
    //镜面反射 
    vec3 viewDir = normalize(eyePos - FragPos);
    vec3 h = normalize(viewDir + lightDir);
    float spec = pow(max(dot(h, norm), 0.0), material.shininess);
    vec3 specular = spec * light.specular * texture(material.specular, TexCoords).rgb;

    ambient  *= attenuation; 
    diffuse  *= attenuation;
    specular *= attenuation;
    vec3 result = ambient + diffuse + specular;
    FragColor = vec4(result, 1.0);
}